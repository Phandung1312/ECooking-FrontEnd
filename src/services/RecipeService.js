    import axios from "../plugins/axios";

const recipeService = {

    //request api
    async getListRecipe(filterParams) {
        try {
            const params = new URLSearchParams();
            params.append('value', filterParams.keyword);
            // params.append('sortType', filterParams.sortType);
            // params.append('sortField', filterParams.sortField);
            params.append('status', filterParams.status === 'all' ? '' : filterParams.status);
            params.append('page', filterParams.page);
            params.append('perPage', filterParams.size);
            const urlWithParams = `recipes?${params.toString()}`;
            const response = await axios.get(urlWithParams);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw new Error();
        }
    },
    async blockRecipe(recipeId, notifyCallback) {
        try {
            const url = `recipes/${recipeId}/block`;
            const response = await axios.patch(url);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Block recipe success",
                    type: "success",
                });
                return 'ok';
            }
            else{
                notifyCallback({
                    title: "Fail",
                    text: "Block recipe fail",
                    type: "error",
                });
                return 'fail';
            }
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    
    },
    async unblockRecipe(recipeId, notifyCallback) {
        try {
            const url = `recipes/${recipeId}/unblock`;
            const response = await axios.patch(url);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Unblock recipe success",
                    type: "success",
                });
                return 'ok';
            }
            else{
                notifyCallback({
                    title: "Fail",
                    text: "Unblock recipe fail",
                    type: "error",
                });
                return 'fail';
            }
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },
    //handle server error response
    handleError(error, notifyCallback) {
        if (error.response) {
            const errorData = error.response.data;
            if (errorData && errorData.messages) {
                errorData.messages.forEach(message => {
                    if (notifyCallback)
                        notifyCallback({
                            title: "Fail",
                            text: message,
                            type: "error"
                        });
                });
            }
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
};

export default recipeService;

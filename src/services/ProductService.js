import axios from "../plugins/axios";

const productService = {

    //request api
    async getListProducts(filterParams) {
        try {
            const params = new URLSearchParams();
            params.append('keyword', filterParams.keyword);
            params.append('sortType', filterParams.sortType);
            params.append('sortField', filterParams.sortField);
            params.append('page', filterParams.page);
            params.append('size', filterParams.size);
            const urlWithParams = `products?${params.toString()}`;
            const response = await axios.get(urlWithParams);
            return response.data;
        } catch (error) {
            this.handleError(error);
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

export default productService;

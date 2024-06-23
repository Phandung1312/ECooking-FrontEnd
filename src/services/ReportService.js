import axios from "../plugins/axios";

const reportService = {
    async getListReport(filterParams) {
        try{
            const params = new URLSearchParams();
            params.append('status', filterParams.status === 'all' ? '' : filterParams.status);
            params.append('page', filterParams.page);
            params.append('perPage', filterParams.size);
            const urlWithParams = `reports?${params.toString()}`;
            const response = await axios.get(urlWithParams);
            return response.data;
        }
        catch (error) {
            this.handleError(error);
            throw new Error();
        }
    },
    async resolveReport(reportId, notifyCallback) {
        try {
            const url = `reports/${reportId}/resolve`;
            const response = await axios.patch(url);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Resolved report, recipe is blocked",
                    type: "success",
                });
                return 'ok';
            }
            else{
                notifyCallback({
                    title: "Fail",
                    text: "Resolve report fail",
                    type: "error",
                });
                return 'fail';
            }
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },
    async rejectReport(reportId, notifyCallback) {
        try {
            const url = `reports/${reportId}/reject`;
            const response = await axios.patch(url);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Rejected report",
                    type: "success",
                });
                return 'ok';
            }
            else{
                notifyCallback({
                    title: "Fail",
                    text: "Reject report fail",
                    type: "error",
                });
                return 'fail';
            }
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },


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
}

export default reportService;
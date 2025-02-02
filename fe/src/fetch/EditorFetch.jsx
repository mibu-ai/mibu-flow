export const updateFile = async (fileData) => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/upload-file', {
            method: 'POST',
            body: fileData, // FormData is directly assigned to body
        });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};


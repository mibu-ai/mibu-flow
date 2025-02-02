export const uploadFile = async (file) => {
  
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:5000/api/v1/upload-file", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  const { job_id } = data;

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      try {
        const jobResponse = await fetch(
          `http://127.0.0.1:5000/api/v1/job-status/${job_id}`
        );
        const data = await jobResponse.json();
        const { status, payload } = data;

        if (status === "completed") {
          clearInterval(intervalId);
          resolve(payload);
        } else if (status === "error") {
          clearInterval(intervalId);
          reject(new Error(payload));
        }
      } catch (error) {
        clearInterval(intervalId);
        reject(error);
      }
    }, 1000); // Poll every 1 second
  });
};

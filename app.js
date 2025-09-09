const fs = require("fs").promises;

async function createProject_removeProject({
  fileName,
  folderName,
  fileType,
  fileData,
  fileMoreData = "",
}) {
  const address = `./${folderName}/${fileName}.${fileType}`;
  try {
    // ساخت پوشه
    await fs.mkdir(`./${folderName}`);
    console.log("folder created successfully");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // نوشتن فایل
    await fs.writeFile(address, fileData);
    console.log("file written successfully");

    if (fileMoreData) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await fs.appendFile(address, fileMoreData);
      console.log("file appended successfully");
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // حذف فایل
    await fs.unlink(address);
    console.log("file deleted successfully");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // حذف پوشه
    await fs.rmdir(`./${folderName}`);
    console.log("folder deleted successfully");

    console.log("end");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

createProject_removeProject({
  folderName: "kharazmi",
  fileName: "khirzade",
  fileType: "txt",
  fileData: `hello khirzade`,
});
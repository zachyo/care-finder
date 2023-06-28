import React, { useState } from "react";
import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Customer {
  id: number;
  name: string;
  email: string;
    // [key: string]: number | string;
}

interface Props {
  customers: Customer[];
}

const ExportCustomersButton: React.FC<Props> = ({ customers }) => {
  const filename : string = `${Date.now()}_hospital_list.csv`;
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  // Create a storage reference from our storage service
  const storageRef = ref(storage, "hospital_lists/" + filename);
  const handleExportClick = () => {
    const csvData = generateCSVContent(customers);
    const csvFile = new Blob([csvData], { type: "text/csv" });
    
    //uupload to online storage
    uploadBytes(storageRef, csvFile).then((snapshot) => {
      console.log("Uploaded the CSV file!");
      //generate download link once uploaded
      downloadCsv();
    });

  };

  const generateCSVContent = (data: Customer[]) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = String(row[header as keyof Customer]).replace(
          /"/g,
          '\\"'
        );
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };
  const downloadCsv = () => {
    getDownloadURL(ref(storage, "hospital_lists/" + filename))
      .then((url) => {
        console.log(url);
        setDownloadUrl(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  }

  return (
    <div>
      <button onClick={handleExportClick}>Export Customers as CSV</button>
      {downloadUrl && (
        <div>
          <a href={downloadUrl} download="hospital_list.csv">
            Download CSV
          </a>
        </div>
      )}
    </div>
  );
};

export default ExportCustomersButton;

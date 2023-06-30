import React, { useState } from "react";
import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Hospital } from "../types/hospital";

interface Props {
  data: Hospital[];
  locality: string;
}

const ExportCustomersButton: React.FC<Props> = ({ data, locality }) => {
  const [loading, setLoading] = useState(false)
  const filename: string = `${
    locality ? locality : Date.now()
  }_hospital_list.csv`;
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const newData = data.filter((_, index) => index < 15);
  console.log(locality)
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  // Create a storage reference from our storage service
  const storageRef = ref(storage, "hospital_lists/" + filename);
  const handleExportClick = () => {
    setLoading(true)
    const csvData = generateCSVContent(newData);
    const csvFile = new Blob([csvData], { type: "text/csv" });

    //uupload to online storage
    uploadBytes(storageRef, csvFile).then((snapshot) => {
      console.log("Uploaded the CSV file!");
      //generate download link once uploaded
      downloadCsv();
    });
  };

  const generateCSVContent = (data: Hospital[]) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = String(row[header as keyof Hospital]).replace(
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
        setLoading(false)
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  };
  const generateShareableLink = (downloadUrl: string) => {
    const subject = "Exported Hospital List";
    const body = `Here is the link to download the exported hospital list: ${downloadUrl}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    return mailtoLink;
  };

  return (
    <div>
      <button onClick={handleExportClick}>Export Hospitals as CSV</button>
      {downloadUrl && !loading && (
        <div>
          <a href={downloadUrl} download="hospital_list.csv">
            Download CSV
          </a>
          <a
            href={generateShareableLink(downloadUrl)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share 
          </a>
        </div>
      )}
    </div>
  );
};

export default ExportCustomersButton;

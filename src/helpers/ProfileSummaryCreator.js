import { Alert } from "react-native";
import { errorToastMessage } from "../utility/ToastMessage";
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const createProfileSummary = (profileData) => {
    return `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .profile-picture { text-align: center; margin-bottom: 20px; }
          .profile-picture img { border-radius: 50%; width: 150px; height: 150px; }
          .profile-info { margin-top: 20px; }
          .profile-info p { margin: 10px 0; }
          .profile-info p strong { display: inline-block; width: 150px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Profile Summary</h1>
        </div>
        <div class="profile-picture">
          <img src="${profileData.profilePicture}" alt="Profile Picture" />
        </div>
        <div class="profile-info">
          <p><strong>Name:</strong> ${profileData.name}</p>
          <p><strong>Email:</strong> ${profileData.email}</p>
          <p><strong>Mobile Number:</strong> ${profileData.mobile}</p>
          <p><strong>Address:</strong> ${profileData.address}</p>
          <p><strong>Subscription Plan:</strong> ${profileData.plan}</p>
        </div>
      </body>
      </html>
    `;
  };
export const downloadProfileSummary = async (profileData) => {
    try {
      const htmlContent = createProfileSummary(profileData);
      const fileName = `Profile_Summary_${profileData.name}`;
      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      const options = {
        html: htmlContent,
        fileName: fileName,
        directory: 'Downloads',
        path: filePath
      };

      const pdfFile = await RNHTMLtoPDF.convert(options);
      if (pdfFile) {
        Alert.alert(
          'Profile Summary Downloaded',
        )
      }

    } catch (error) {
      console.error('Error generating profile summary PDF:', error);
      errorToastMessage('Error generating profile summary PDF')
    }
  };
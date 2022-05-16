import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const captureAvatarImage = () => {
  domtoimage.toBlob(document.getElementById("grids")).then((blob) => {
    window.saveAs(blob, "avatar.png");
  });
};

export { captureAvatarImage };

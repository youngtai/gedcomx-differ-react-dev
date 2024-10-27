import PropTypes from "prop-types";

export default function FileUpload({
  onChange,
  onError = (msg) => console.error(msg),
  allowedExtensions = [".json"],
  maxNumFiles = 2,
}) {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    let keys = Object.keys(files);
    let normalizedFiles = keys.map((k) => {
      return {
        name: files[k].name,
        fileObj: files[k],
      };
    });

    if (files.length > maxNumFiles) {
      onError(
        `Exceeded maximum number of files to upload! (Max: ${maxNumFiles})`
      );
    } else {
      onChange(normalizedFiles);
    }

  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept={allowedExtensions.join(",")}
      />
    </div>
  );
}

FileUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func,
  allowedExtensions: PropTypes.arrayOf(PropTypes.string),
  maxNumFiles: PropTypes.number,
};

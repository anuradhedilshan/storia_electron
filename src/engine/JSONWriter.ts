import fs from "fs";

class JSONWriter {
  private writeStream: fs.WriteStream;
  private isOpen = false;
  private prev = false;

  constructor(filePath: string) {
    this.writeStream = fs.createWriteStream(filePath, { flags: "w" });
    this.writeStream.write("[\n");
    this.isOpen = true;
  }

  appendData(data: unknown) {
    if (!this.isOpen) {
      throw new Error("JSONWriter is closed. Cannot append data.");
    }

    const dataArray = Array.isArray(data) ? data : [data];
    dataArray.forEach((item, index) => {
      if (index > 0 || this.prev) {
        this.writeStream.write(",\n");
      }
      this.writeStream.write(JSON.stringify(item, null, 2)); // Ensure items are stringified with proper indentation (null, 2)
    });
    this.prev = true;
  }

  close() {
    if (this.isOpen) {
      this.writeStream.write("\n]");
      this.writeStream.end();
      this.isOpen = false;
    }
  }
}

export default JSONWriter;

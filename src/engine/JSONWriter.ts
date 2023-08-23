import fs from "fs";
class JSONWriter {
  private writeStream: fs.WriteStream;

  constructor(filePath: string) {
    this.writeStream = fs.createWriteStream(filePath, { flags: "a" }); // Append mode
    this.writeStream.write("[\n"); // Start the array
  }

  appendData(data: unknown) {
    const dataArray = Array.isArray(data) ? data : [data];
    dataArray.forEach((item, index) => {
      if (index > 0) {
        this.writeStream.write(",\n"); // Add a comma between items
      }
      this.writeStream.write(item);
    });
    this.writeStream.write(",\n");
    
  }
  close() {
    this.writeStream.write("]\n"); 
    this.writeStream.end();
  
  }
}

export default JSONWriter;

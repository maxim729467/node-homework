const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')

class UploadService {
  constructor(file, dest) {
    this.file = file
    this.dest = dest
  }

  async transformAvatar(filePath) {
    const picture = await jimp.read(filePath)
    await picture
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER |
        jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(filePath)
  }

  async process() {
    await this.transformAvatar(this.file.path)
    await fs.rename(this.file.path, path.join(this.dest, this.file.filename))
    try {
      await fs.unlink(path.join('./tmp', this.file.filename))
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UploadService

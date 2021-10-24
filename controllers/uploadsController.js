const { StatusCodes } = require('http-status-codes')
const path = require('path')
const CustomErrors = require('../errors')

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new CustomErrors.BadRequestError('No File uploaded')
  }

  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomErrors.BadRequestError('Please upload image')
  }

  const maxSize = 5 * 1024 * 1024
  if (productImage.size > maxSize) {
    throw new CustomErrors.BadRequestError(
      `Please upload image smaller than 5MB`
    )
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )

  await productImage.mv(imagePath)

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

module.exports = { uploadProductImage }

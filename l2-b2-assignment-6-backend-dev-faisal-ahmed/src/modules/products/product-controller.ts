import { SendSuccessResponse } from '../../utils/response-helper';
import { TryCatch } from '../../utils/try-catch';
import { ProductServices } from './services';

const AddProduct = TryCatch(async (req, res) => {
  const addProductResponse = await ProductServices.AddProduct(
    req.user._id as string,
    req.body
  );

  return SendSuccessResponse(res, {
    data: addProductResponse,
    message: 'Product Added Successfully',
    status: 200,
  });
});

const UpdateProduct = TryCatch(async (req, res) => {
  const { productId } = req.params;
  const updateStatus = await ProductServices.UpdateProduct(
    productId,
    req.body,
    req.user.role,
    req.user._id
  );

  return SendSuccessResponse(res, {
    message: 'Product Updated Successfully',
    data: updateStatus,
    status: 200,
  });
});

const DeleteProduct = TryCatch(async (req, res) => {
  const { productId } = req.params;
  const deleteStatus = await ProductServices.DeleteProduct(
    productId,
    req.user.role,
    req.user._id
  );

  return SendSuccessResponse(res, {
    message: 'Product Deleted',
    data: deleteStatus,
    status: 200,
  });
});

const DeleteMultipleProducts = TryCatch(async (req, res) => {
  const productIds = req.body.productIds;
  const deleteStatus = await ProductServices.DeleteMultipleProducts(
    productIds,
    req.user.role,
    req.user._id
  );

  return SendSuccessResponse(res, {
    message: 'Products Deleted',
    data: deleteStatus,
    status: 200,
  });
});

const GetProducts = TryCatch(async (req, res) => {
  const products = await ProductServices.GetProducts(
    req.user._id,
    req.user.role,
    req.query
  );

  return SendSuccessResponse(res, {
    message: 'Product retrieve successfully',
    data: products,
    status: 200,
  });
});

const GetProductById = TryCatch(async (req, res) => {
  const { productId } = req.params;
  const product = await ProductServices.GetProductById(req.user._id, productId);

  return SendSuccessResponse(res, {
    message: 'Product retrieve successfully',
    data: product,
    status: 200,
  });
});

export const ProductsController = {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  DeleteMultipleProducts,
  GetProducts,
  GetProductById,
};

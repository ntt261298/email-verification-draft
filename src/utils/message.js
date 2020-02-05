import toastr from 'toastr';

export const errMessage = (err) => {
  toastr.error(err);
};

export const successMessage = (success) => {
  toastr.success(success);
};
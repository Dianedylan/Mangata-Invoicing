import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  toastoptions = {
    timeOut: 5000,
    closeButton:true,
    tapToDismiss:true
  };
  constructor() { }

  showSuccessAlert(message: string, title?: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: "success",
      confirmButtonText: "Close",
      confirmButtonColor: '#74441C',
      width: 400,
      // timer: 5000
    })
  }

  showErrorAlert(message: string, title?: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonText: "Close",
      confirmButtonColor: '#74441C',
      width: 400,
      // timer: 5000
    })
  }

  showSuccessToast (message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: message
    })
  }
  showErrorToast (message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: message
    })
  }

  showTimedWarning (message) {
    Swal.fire({
      text: message,
      icon: 'warning',
      timer: 5000,
      timerProgressBar: true,
      confirmButtonText: "Close",
      confirmButtonColor: '#74441C',
    });
  }

}

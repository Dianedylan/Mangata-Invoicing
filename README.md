# Mangata-Invoicing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.29 and Node.js v14.20 and PDFMake.

## Compatibility note

This repository is built for Angular 9 / TypeScript 3.8 and is best run with Node.js 14.x or 16.x. Current Node 26.x is too new for this older Angular toolchain, which can cause errors such as `No such module: http_parser` during `ng serve`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## To Generate the PDF

Fill in the details in the dialog forms:
All fields in the form are required

The invoice number and payment date are automatically generated thus not included in the form
#### PDF
Once the form is filled and submitted, a button to print the pdf is available on the resulting data table.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Docker Hub

To pull image from docker hub, check out the [invoice-app:v1.2](https://hub.docker.com/repository/docker/diacode/invoice-app/).

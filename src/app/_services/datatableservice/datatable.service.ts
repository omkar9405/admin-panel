import { Injectable } from "@angular/core";
declare const $;
@Injectable({
  providedIn: "root",
})
export class DatatableService {
  // reloadData():void {
  //   $(function(){
  //   $('#example').DataTable().ajax.reload();
  // });
  // }

  destroy(): void {
    $(function () {
      $("#example").DataTable().clear().destroy();
    });
  }

  initTable(fileName: String): void {
    //console.log("Init");
    $(function () {
      $("#example").DataTable({
        order: [],
        responsive: "true",
        pagingType: "simple_numbers",

        language: {
          searchPlaceholder: "Search...",
          search: "",
        },
        oLanguage: {
          oPaginate: {
            sNext: '<i class="fas fa-chevron-right" ></i>',
            sPrevious: '<i class="fas fa-chevron-left" ></i>',
          },
        },

        dom: "<Bf<t>irp>", //'Blfrtip',

        buttons: [
          {
            extend: "colvis",
            text: '<i class="fas fa-columns"></i>',
            postfixButtons: ["colvisRestore"],
          },
          {
            extend: "copy",
            title: fileName,
            text: '<i class="fas fa-copy"></i>',
            titleAttr: "Copy",
          },
          {
            extend: "excel",
            title: fileName,
            text: '<i class="fas fa-file-excel"></i>',
            titleAttr: "Excel",
          },
          {
            extend: "csv",
            title: fileName,
            text: '<i class="fas fa-file-csv"></i>',
            titleAttr: "CSV",
          },
          {
            extend: "pdf",
            title: fileName,
            text: '<i class="fas fa-file-pdf"></i>',
            titleAttr: "PDF",
          },
          {
            extend: "print",
            title: fileName,
            text: '<i class="fas fa-print"></i>',
            titleAttr: "Print",
          },
          //'colvis', 'copy', 'csv', 'excel', 'pdf', 'print'
        ],
      });
    });
  }

  constructor() {}
}

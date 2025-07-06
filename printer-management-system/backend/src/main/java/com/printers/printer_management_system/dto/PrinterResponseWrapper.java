package com.printers.printerManagementSystem.dto;

import java.util.List;


public class PrinterResponseWrapper {
    private int total;
    private List<PrinterExternalDTO> data;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<PrinterExternalDTO> getData() {
        return data;
    }

    public void setData(List<PrinterExternalDTO> data) {
        this.data = data;
    }
}

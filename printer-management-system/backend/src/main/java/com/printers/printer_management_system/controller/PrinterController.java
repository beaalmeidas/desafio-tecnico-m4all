package com.printers.printerManagementSystem.controller;

import com.printers.printerManagementSystem.model.Printer;
import com.printers.printerManagementSystem.service.PrinterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/printers")
public class PrinterController {
    @Autowired
    private PrinterService printerService;

    @GetMapping
    public List<Printer> getAllPrinters() {
        return printerService.getAllPrinters();
    }

    @GetMapping("/{id}")
    public Printer getPrinterById(@PathVariable UUID id) {
        return printerService.getPrinterById(id);
    }

    @PostMapping
    public Printer createPrinter(@RequestBody Printer printer) {
        return printerService.createPrinter(printer);
    }

    @PutMapping("/{id}")
    public Printer updatePrinter(@PathVariable UUID id, @RequestBody Printer printer) {
        return printerService.updatePrinter(id, printer);
    }

    @DeleteMapping("/{id}")
    public void deletePrinter(@PathVariable UUID id) {
        printerService.deletePrinter(id);
    }
}

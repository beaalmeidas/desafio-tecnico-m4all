package com.printers.printerManagementSystem.controller;

import com.printers.printerManagementSystem.model.Printer;
import com.printers.printerManagementSystem.service.PrinterService;

import com.printers.printerManagementSystem.dto.PrinterStatusDTO;
import com.printers.printerManagementSystem.dto.SyncStatisticsDTO;
import com.printers.printerManagementSystem.service.PrinterSyncService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/printers")
public class PrinterController {
    @Autowired
    private PrinterService printerService;

    @Autowired
    private PrinterSyncService printerSyncService;

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

    @GetMapping("/{id}/status")
    public ResponseEntity<PrinterStatusDTO> getPrinterStatus(@PathVariable UUID id) {
        Printer printer = printerService.getPrinterById(id);
        if (printer == null) return ResponseEntity.notFound().build();

        PrinterStatusDTO dto = new PrinterStatusDTO(
            printer.getStatus().toString(),
            printer.getPaperCapacity()
        );
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/sync/statistics")
    public SyncStatisticsDTO getSyncStatistics() {
        return printerSyncService.getLastSyncStats();
    }
}

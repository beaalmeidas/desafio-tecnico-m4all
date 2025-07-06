package com.printers.printerManagementSystem.controller;

import com.printers.printerManagementSystem.model.Printer;
import com.printers.printerManagementSystem.service.PrinterService;

import com.printers.printerManagementSystem.dto.PrinterStatusDTO;
import com.printers.printerManagementSystem.dto.SyncStatisticsDTO;
import com.printers.printerManagementSystem.service.PrinterSyncService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @GetMapping
    public ResponseEntity<Page<Printer>> getAllPrinters(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Printer> printersPage = printerService.getAllPrinters(pageable);
        return ResponseEntity.ok(printersPage);
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
}

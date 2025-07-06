package com.printers.printerManagementSystem.service;

import com.printers.printerManagementSystem.dto.PrinterExternalDTO;
import com.printers.printerManagementSystem.model.Printer;
import com.printers.printerManagementSystem.repository.PrinterRepository;

import com.printers.printerManagementSystem.dto.PrinterResponseWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;


@Service
public class PrinterSyncService {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://mt.tracerly.net")
            .build();

    @Autowired
    private PrinterRepository printerRepository;

    public void syncPrintersFromExternalAPI() {
        webClient.get()
                .retrieve()
                .bodyToMono(PrinterResponseWrapper.class)
                .doOnNext(response -> {
                    List<PrinterExternalDTO> printers = response.getData();

                    for (PrinterExternalDTO dto : printers) {
                        Printer printer = new Printer();
                        printer.setId(dto.getId());
                        printer.setName(dto.getName());
                        printer.setModel(dto.getModel());
                        printer.setLocation(dto.getLocation());
                        printer.setStatus(dto.getStatus());
                        printer.setPaperCapacity(dto.getPaperCapacity());
                        printer.setCreatedAt(dto.getCreatedAt());

                        printerRepository.save(printer);
                    }
                })
                .subscribe();
    }

    @Scheduled(fixedRate = 3600000)
    public void scheduledSync() {
        System.out.println("--- Sincronizando com a API externa...");
        syncPrintersFromExternalAPI();
    }
}

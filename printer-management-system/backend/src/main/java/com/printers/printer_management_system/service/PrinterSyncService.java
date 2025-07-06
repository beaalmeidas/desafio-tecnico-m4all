package com.printers.printerManagementSystem.service;

import com.printers.printerManagementSystem.dto.PrinterExternalDTO;
import com.printers.printerManagementSystem.model.Printer;
import com.printers.printerManagementSystem.repository.PrinterRepository;

import com.printers.printerManagementSystem.dto.SyncStatisticsDTO;

import com.printers.printerManagementSystem.dto.PrinterResponseWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.OffsetDateTime;
import java.util.List;


@Service
public class PrinterSyncService {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://mt.tracerly.net")
            .build();

    private int lastCreated = 0;
    private int lastUpdated = 0;
    private int lastTotal = 0;
    private OffsetDateTime lastSyncTime = null;

    @Autowired
    private PrinterRepository printerRepository;

    public void syncPrintersFromExternalAPI() {
        webClient.get()
                .retrieve()
                .bodyToMono(PrinterResponseWrapper.class)
                .doOnNext(response -> {
                    List<PrinterExternalDTO> printers = response.getData();

                    int created = 0;
                    int updated = 0;

                    for (PrinterExternalDTO dto : printers) {
                        Printer existing = printerRepository.findById(dto.getId()).orElse(null);

                        if (existing == null) {
                            Printer newPrinter = new Printer();
                            newPrinter.setId(dto.getId());
                            newPrinter.setName(dto.getName());
                            newPrinter.setModel(dto.getModel());
                            newPrinter.setLocation(dto.getLocation());
                            newPrinter.setStatus(dto.getStatus());
                            newPrinter.setPaperCapacity(dto.getPaperCapacity());
                            newPrinter.setCreatedAt(dto.getCreatedAt());

                            printerRepository.save(newPrinter);
                            created++;
                        } else {
                            existing.setName(dto.getName());
                            existing.setModel(dto.getModel());
                            existing.setLocation(dto.getLocation());
                            existing.setStatus(dto.getStatus());
                            existing.setPaperCapacity(dto.getPaperCapacity());

                            printerRepository.save(existing);
                            updated++;
                        }
                    }

                    lastCreated = created;
                    lastUpdated = updated;
                    lastTotal = printers.size();
                    lastSyncTime = OffsetDateTime.now();

                    System.out.println("\n--- Sincronização concluída. Impressoras criadas: " + created + ", Impressoras atualizadas: " + updated + "\n");
                })
                .subscribe();
    }

    @Scheduled(fixedRate = 3600000)
    public void scheduledSync() {
        System.out.println("\n--- Sincronizando com a API externa...\n");
        syncPrintersFromExternalAPI();
    }

    public SyncStatisticsDTO getLastSyncStats() {
        return new SyncStatisticsDTO(lastTotal, lastCreated, lastUpdated, lastSyncTime);
    }
}

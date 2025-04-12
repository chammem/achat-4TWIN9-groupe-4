package tn.esprit.rh.achat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import tn.esprit.rh.achat.entities.Facture;
import tn.esprit.rh.achat.repositories.FactureRepository;
import tn.esprit.rh.achat.services.FactureServiceImpl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class FactureServiceImplTest {

    @Mock
    private FactureRepository factureRepository;

    @InjectMocks
    private FactureServiceImpl factureService;

    private Facture facture;

    @BeforeEach
    void setUp() {
        facture = new Facture();
        facture.setIdFacture(1L);
        facture.setMontantFacture(200f);
        facture.setMontantRemise(20f);
        facture.setDateCreationFacture(new Date());
        facture.setArchivee(false);
    }

    @Test
    void testRetrieveAllFactures() {
        List<Facture> factures = Arrays.asList(facture);
        when(factureRepository.findAll()).thenReturn(factures);

        List<Facture> result = factureService.retrieveAllFactures();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(factureRepository, times(1)).findAll();
    }

    @Test
    void testRetrieveFacture() {
        when(factureRepository.findById(1L)).thenReturn(Optional.of(facture));

        Facture result = factureService.retrieveFacture(1L);

        assertNotNull(result);
        assertEquals(1L, result.getIdFacture());
        verify(factureRepository, times(1)).findById(1L);
    }

    @Test
    void testAddFacture() {
        when(factureRepository.save(facture)).thenReturn(facture);

        Facture result = factureService.addFacture(facture);

        assertNotNull(result);
        assertEquals(200f, result.getMontantFacture());
        verify(factureRepository, times(1)).save(facture);
    }

    @Test
    void testCancelFacture() {
        when(factureRepository.findById(1L)).thenReturn(Optional.of(facture));

        factureService.cancelFacture(1L);

        assertTrue(facture.getArchivee());
        verify(factureRepository, times(1)).save(facture);
        verify(factureRepository, times(1)).updateFacture(1L);
    }
}

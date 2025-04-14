package tn.esprit.rh.achat.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.rh.achat.entities.DetailFournisseur;
import tn.esprit.rh.achat.entities.Fournisseur;
import tn.esprit.rh.achat.repositories.DetailFournisseurRepository;
import tn.esprit.rh.achat.repositories.FournisseurRepository;
import tn.esprit.rh.achat.repositories.ProduitRepository;
import tn.esprit.rh.achat.repositories.SecteurActiviteRepository;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FournisseurServiceImplTest {

    @InjectMocks
    FournisseurServiceImpl fournisseurService;

    @Mock
    FournisseurRepository fournisseurRepository;

    @Mock
    DetailFournisseurRepository detailFournisseurRepository;

    @Mock
    ProduitRepository produitRepository;

    @Mock
    SecteurActiviteRepository secteurActiviteRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddFournisseur() {
        // Arrange
        Fournisseur fournisseur = new Fournisseur();
        fournisseur.setLibelle("Test Fournisseur");
        fournisseur.setCode("T123");

        when(fournisseurRepository.save(any(Fournisseur.class))).thenAnswer(invocation -> {
            Fournisseur f = invocation.getArgument(0);
            f.setIdFournisseur(1L);
            return f;
        });

        // Act
        Fournisseur result = fournisseurService.addFournisseur(fournisseur);

        // Assert
        assertNotNull(result);
        assertEquals("Test Fournisseur", result.getLibelle());
        assertNotNull(result.getDetailFournisseur());
        assertTrue(result.getDetailFournisseur().getDateDebutCollaboration() instanceof Date);
        verify(fournisseurRepository, times(1)).save(fournisseur);
    }
}

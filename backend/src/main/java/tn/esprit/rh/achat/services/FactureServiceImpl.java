package tn.esprit.rh.achat.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.rh.achat.entities.*;
import tn.esprit.rh.achat.repositories.*;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
@Transactional
public class FactureServiceImpl implements IFactureService {

	@Autowired
	FactureRepository factureRepository;
	@Autowired
	OperateurRepository operateurRepository;
	@Autowired
	DetailFactureRepository detailFactureRepository;
	@Autowired
	FournisseurRepository fournisseurRepository;
	@Autowired
	ProduitRepository produitRepository;
	@Autowired
	ReglementServiceImpl reglementService;


	@Override
	public List<Facture> retrieveAllFactures() {
		log.trace("🔍 [Service] retrieveAllFactures() STARTED...");
		List<Facture> factures = (List<Facture>) factureRepository.findAll();
		log.info("📦 [Service] Fetched {} factures", factures.size());
		return factures;
	}


	public Facture addFacture(Facture f) {
		log.info("Adding new facture with preliminary ID: {}", f.getIdFacture());
		Facture savedFacture = factureRepository.save(f);
		log.info("Facture added with ID: {}", savedFacture.getIdFacture());
		return savedFacture;
	}

	private Facture addDetailsFacture(Facture f, Set<DetailFacture> detailsFacture) {
		float montantFacture = 0;
		float montantRemise = 0;
		for (DetailFacture detail : detailsFacture) {
			Produit produit = produitRepository.findById(detail.getProduit().getIdProduit()).orElse(null);
			if (produit == null) {
				log.warn("Product with ID {} not found", detail.getProduit().getIdProduit());
				continue;
			}
			float prixTotalDetail = detail.getQteCommandee() * produit.getPrix();
			float montantRemiseDetail = (prixTotalDetail * detail.getPourcentageRemise()) / 100;
			float prixTotalDetailRemise = prixTotalDetail - montantRemiseDetail;

			detail.setMontantRemise(montantRemiseDetail);
			detail.setPrixTotalDetail(prixTotalDetailRemise);

			montantFacture += prixTotalDetailRemise;
			montantRemise += montantRemiseDetail;

			detailFactureRepository.save(detail);

			log.debug("Processed detail - Product ID: {}, Remise: {}, Total: {}",
					produit.getIdProduit(), montantRemiseDetail, prixTotalDetailRemise);
		}
		f.setMontantFacture(montantFacture);
		f.setMontantRemise(montantRemise);
		log.info("Facture totals - Montant: {}, Remise: {}", montantFacture, montantRemise);
		return f;
	}

	@Override
	public void cancelFacture(Long factureId) {
		log.warn("Cancelling facture with ID: {}", factureId);
		Facture facture = factureRepository.findById(factureId).orElse(new Facture());
		facture.setArchivee(true);
		factureRepository.save(facture);
		factureRepository.updateFacture(factureId);
	}

	@Override
	public Facture retrieveFacture(Long factureId) {
		log.info("Retrieving facture with ID: {}", factureId);
		Facture facture = factureRepository.findById(factureId).orElse(null);
		log.debug("Facture retrieved: {}", facture);
		return facture;
	}

	@Override
	public List<Facture> getFacturesByFournisseur(Long idFournisseur) {
		log.info("Getting factures for fournisseur with ID: {}", idFournisseur);
		Fournisseur fournisseur = fournisseurRepository.findById(idFournisseur).orElse(null);
		if (fournisseur == null) {
			log.warn("Fournisseur with ID {} not found", idFournisseur);
			return null;
		}
		List<Facture> factures = (List<Facture>) fournisseur.getFactures();
		log.info("Retrieved {} factures for fournisseur ID: {}", factures.size(), idFournisseur);
		return factures;
	}

	@Override
	public void assignOperateurToFacture(Long idOperateur, Long idFacture) {
		log.info("Assigning operateur ID {} to facture ID {}", idOperateur, idFacture);
		Facture facture = factureRepository.findById(idFacture).orElse(null);
		Operateur operateur = operateurRepository.findById(idOperateur).orElse(null);
		if (facture == null || operateur == null) {
			log.error("Assignment failed: Facture or Operateur not found.");
			return;
		}
		operateur.getFactures().add(facture);
		operateurRepository.save(operateur);
		log.info("Assignment completed.");
	}

	@Override
	public float pourcentageRecouvrement(Date startDate, Date endDate) {
		log.info("Calculating pourcentage de recouvrement from {} to {}", startDate, endDate);
		float totalFactures = factureRepository.getTotalFacturesEntreDeuxDates(startDate, endDate);
		float totalRecouvrement = reglementService.getChiffreAffaireEntreDeuxDate(startDate, endDate);
		if (totalFactures == 0) {
			log.warn("No factures found between {} and {}", startDate, endDate);
			return 0;
		}
		float pourcentage = (totalRecouvrement / totalFactures) * 100;
		log.info("Pourcentage de recouvrement: {}%", pourcentage);
		return pourcentage;
	}
}

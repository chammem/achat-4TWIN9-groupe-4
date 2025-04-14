package tn.esprit.rh.achat.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.rh.achat.entities.SecteurActivite;
import tn.esprit.rh.achat.repositories.SecteurActiviteRepository;

import java.util.List;

@Service
public class SecteurActiviteServiceImpl implements ISecteurActiviteService {

	private static final Logger logger = LoggerFactory.getLogger(SecteurActiviteServiceImpl.class);

	@Autowired
	private SecteurActiviteRepository secteurActiviteRepository;

	@Override
	public List<SecteurActivite> retrieveAllSecteurActivite() {
		logger.info("Récupération de tous les secteurs d'activité");
		return secteurActiviteRepository.findAll();
	}

	@Override
	public SecteurActivite addSecteurActivite(SecteurActivite sa) {
		logger.info("Ajout d'un nouveau secteur d'activité : {}", sa.getLibelleSecteurActivite());
		return secteurActiviteRepository.save(sa);
	}

	@Override
	public void deleteSecteurActivite(Long id) {
		logger.warn("Suppression du secteur d'activité avec ID : {}", id);
		secteurActiviteRepository.deleteById(id);
	}

	@Override
	public SecteurActivite updateSecteurActivite(SecteurActivite sa) {
		logger.info("Mise à jour du secteur d'activité avec ID : {}", sa.getIdSecteurActivite());
		return secteurActiviteRepository.save(sa);
	}

	@Override
	public SecteurActivite retrieveSecteurActivite(Long id) {
		logger.info("Récupération du secteur d'activité avec ID : {}", id);
		return secteurActiviteRepository.findById(id).orElse(null);
	}
}

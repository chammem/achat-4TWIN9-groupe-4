package tn.esprit.rh.achat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.rh.achat.entities.SecteurActivite;
import org.springframework.stereotype.Repository;
@Repository
public interface SecteurActiviteRepository extends JpaRepository<SecteurActivite, Long> {
}

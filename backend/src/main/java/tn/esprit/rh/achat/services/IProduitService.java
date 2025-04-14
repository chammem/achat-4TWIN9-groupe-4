<<<<<<< HEAD
package tn.esprit.rh.achat.services;

import tn.esprit.rh.achat.entities.Produit;

import java.util.List;

public interface IProduitService {

	List<Produit> retrieveAllProduits();

	Produit addProduit(Produit p);

	void deleteProduit(Long id);

	Produit updateProduit(Produit p);

	Produit retrieveProduit(Long id);

	void assignProduitToStock(Long idProduit, Long idStock);

}
=======
package tn.esprit.rh.achat.services;

import tn.esprit.rh.achat.entities.Produit;

import java.util.List;

public interface IProduitService {

	List<Produit> retrieveAllProduits();

	Produit addProduit(Produit p);

	void deleteProduit(Long id);

	Produit updateProduit(Produit p);

	Produit retrieveProduit(Long id);

	void assignProduitToStock(Long idProduit, Long idStock);

}
>>>>>>> df2a6f5967fa7af69cab542e13d3a28c60b52643

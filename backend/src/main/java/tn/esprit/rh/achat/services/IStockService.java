<<<<<<< HEAD
package tn.esprit.rh.achat.services;

import tn.esprit.rh.achat.entities.Stock;

import java.util.List;

public interface IStockService {

	List<Stock> retrieveAllStocks();

	Stock addStock(Stock s);

	void deleteStock(Long id);

	Stock updateStock(Stock u);

	Stock retrieveStock(Long id);

	String retrieveStatusStock();
}
=======
package tn.esprit.rh.achat.services;

import tn.esprit.rh.achat.entities.Stock;

import java.util.List;

public interface IStockService {

	List<Stock> retrieveAllStocks();

	Stock addStock(Stock s);

	void deleteStock(Long id);

	Stock updateStock(Stock u);

	Stock retrieveStock(Long id);

	String retrieveStatusStock();
}
>>>>>>> df2a6f5967fa7af69cab542e13d3a28c60b52643

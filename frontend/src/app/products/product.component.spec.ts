import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from '../shared/Model/Product';
import { ProductService } from '../shared/Service/Product.service';

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let productService: jasmine.SpyObj<ProductService>;
    let modalService: jasmine.SpyObj<NgbModal>;
  
    beforeEach(() => {
      const productServiceSpy = jasmine.createSpyObj('ProductService', [
        'getAllProducts', 
        'addProduct', 
        'editProduct', 
        'deleteProduct'
      ]);
      const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);
  
      TestBed.configureTestingModule({
        declarations: [ProductsComponent],
        imports: [HttpClientTestingModule],
        providers: [
          { provide: ProductService, useValue: productServiceSpy },
          { provide: NgbModal, useValue: modalServiceSpy }
        ]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ProductsComponent);
      component = fixture.componentInstance;
      productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
      modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  
      fixture.detectChanges(); // Applique les changements
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    it('should call getAllProducts on init', () => {
      spyOn(component, 'getAllProducts');
      component.ngOnInit();
      expect(component.getAllProducts).toHaveBeenCalled();
    });
  
    it('should fetch all products from the service', () => {
      const dummyProducts: Product[] = [
        { idProduit: 1, codeProduit: 'P001', libelleProduit: 'Produit 1', prix: 100, dateCreation: new Date(), dateDerniereModification: new Date() },
        { idProduit: 2, codeProduit: 'P002', libelleProduit: 'Produit 2', prix: 200, dateCreation: new Date(), dateDerniereModification: new Date() }
      ];
  
      // Simulation du retour de getAllProducts
      productService.getAllProducts.and.returnValue(of(dummyProducts));
  
      // Appeler getAllProducts
      component.getAllProducts();
      fixture.detectChanges(); // Applique les changements après l'appel
  
      // Vérification des résultats
      expect(component.listProducts).toEqual(dummyProducts);
      expect(productService.getAllProducts).toHaveBeenCalled();
    });
  
    it('should add a product', () => {
      const newProduct: Product = { idProduit: null, codeProduit: 'P003', libelleProduit: 'Produit 3', prix: 300, dateCreation: new Date(), dateDerniereModification: new Date() };
  
      productService.addProduct.and.returnValue(of(newProduct));
      component.addProduct(newProduct);
  
      expect(productService.addProduct).toHaveBeenCalledWith(newProduct);
      expect(component.form).toBeFalse();
    });
  
    it('should edit a product', () => {
      const productToEdit: Product = { idProduit: 1, codeProduit: 'P001', libelleProduit: 'Produit 1', prix: 100, dateCreation: new Date(), dateDerniereModification: new Date() };
  
      productService.editProduct.and.returnValue(of(productToEdit));
      component.editProduct(productToEdit);
  
      expect(productService.editProduct).toHaveBeenCalledWith(productToEdit);
    });
  
    it('should delete a product', () => {
      const productId = 1;
  
      productService.deleteProduct.and.returnValue(of({}));
      component.deleteProduct(productId);
  
      expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
      expect(productService.getAllProducts).toHaveBeenCalled();
    });
  
    it('should open modal with the selected product', () => {
      const mockModal = { result: Promise.resolve('closed') };
      modalService.open = jasmine.createSpy().and.returnValue(mockModal);
  
      const productToEdit: Product = { idProduit: 1, codeProduit: 'P001', libelleProduit: 'Produit 1', prix: 100, dateCreation: new Date(), dateDerniereModification: new Date() };
      component.open('modalContent', productToEdit);
  
      expect(modalService.open).toHaveBeenCalledWith('modalContent', { ariaLabelledBy: 'modal-basic-title' });
      expect(component.product).toEqual(productToEdit);
    });
  
    it('should call cancel and close the form', () => {
      component.cancel();
      expect(component.form).toBeFalse();
    });
  });
  
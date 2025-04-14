import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SecteurActivite } from '../shared/Model/Secteur-activite';
import { SecteurActiviteService } from '../shared/Service/Secteur-activite.service';

@Component({
  selector: 'app-secteur-activite',
  templateUrl: './secteur-activite.component.html',
  styleUrls: ['./secteur-activite.component.css']
})
export class SecteurActiviteComponent implements OnInit {

  listSec: SecteurActivite[] = []; // Typed as an array of SecteurActivite
  form: boolean = false;
  sec: SecteurActivite = { idSecteurActivite: null, codeSecteurActivite: null, libelleSecteurActivite: null }; // Initialized with default values
  closeResult: string = '';

  constructor(private secteurActiviteService: SecteurActiviteService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllSec();
  }

  // Fetch all secteur activites
  getAllSec(): void {
    this.secteurActiviteService.getAllSecteurActivites().subscribe(
      (res: SecteurActivite[]) => {
        this.listSec = res;
      },
      (error) => {
        console.error('Error fetching secteur activites:', error);
      }
    );
  }
  

  // Add a new secteur activite
  addSec(sec: SecteurActivite): void {
    this.secteurActiviteService.addSecteurActivite(sec).subscribe(
      () => {
        this.getAllSec();
        this.form = false;
      },
      (error) => {
        console.error('Error adding secteur activite:', error);
      }
    );
  }

  // Edit an existing secteur activite
  editSec(sec: SecteurActivite): void {
    this.secteurActiviteService.editSecteurActivite(sec).subscribe(
      () => {
        this.getAllSec();
      },
      (error) => {
        console.error('Error editing secteur activite:', error);
      }
    );
  }

  // Delete a secteur activite by ID
  deleteSec(idSec: number): void {
    this.secteurActiviteService.deleteSecteurActivite(idSec).subscribe(
      () => {
        this.getAllSec();
      },
      (error) => {
        console.error('Error deleting secteur activite:', error);
      }
    );
  }

  // Open the modal to add or edit a secteur activite
  open(content: any, action: SecteurActivite | null): void {
    if (action != null) {
      this.sec = { ...action }; // Ensure we don't modify the original object directly
    } else {
      this.sec = { idSecteurActivite: null, codeSecteurActivite: null, libelleSecteurActivite: null }; // Default new object
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // Get the reason the modal was dismissed
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Cancel form and reset form status
  cancel(): void {
    this.form = false;
    this.sec = { idSecteurActivite: null, codeSecteurActivite: null, libelleSecteurActivite: null }; // Reset sec object
  }
}

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'error-modal-component',
  template: '<div></div>'
})

export class ErrorModalComponent implements OnInit {
  @Input() visible: boolean;
  @Input() message: string;
  @Output() dismissedError = new EventEmitter();

  public thisModal;
  currentLoading: any;

  constructor(
    public modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('in error modal component');
    console.log(this.visible);
    if (this.visible) {
      console.log('in this now');
      this.thisModal = this.modalCtrl.create(ErrorComponent, { message: this.message })
      this.thisModal.present();
      this.thisModal.onDidDismiss(data => {
        this.dismissedError.emit();
      });

    } else {
      console.log('in this here');
      if (this.thisModal) {
        this.thisModal.dismiss();
      }
    }
  }




}


@Component({
  selector: 'error-component',
  templateUrl: 'error-modal.component.html'
})

export class ErrorComponent {

  public message;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.message = this.params.get('message');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
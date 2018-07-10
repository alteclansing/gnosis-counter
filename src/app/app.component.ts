import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import * as firebase from 'firebase';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('diag') confirmDiag;
  @ViewChild('unsuccessSB') customSB;
  diagRef: MatDialogRef<any>;
  counterDate: string;
  counter: number;
  imgPath: string;
  url: string;
  secret: string;

  constructor(private sb: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit(): void {

    firebase.database().ref('lastDied').once('value').then(res => {
      this.counterDate = res.val();
      this.counter = this.calcDays(this.counterDate);
      this.chooseImg(this.counter);
    });
    const dbRef = firebase.database().ref('lastDied');
    dbRef.on('value', (snapshot) => {
      this.counterDate = snapshot.val();
      this.counter = this.calcDays(this.counterDate);
      this.chooseImg(this.counter);
    });

    this.url = environment.url;
    console.log(this.url);
  }

  ngOnDestroy(): void {
    firebase.database().goOffline();
  }

  chooseImg(days: number) {
    if (days === 0 ) {
      this.imgPath = 'assets/loudly-crying-face_1f62d.png';
    } else if (days <= 5) {
      this.imgPath = 'assets/disappointed-but-relieved-face_1f625.png';
    } else if (days <= 10) {
      this.imgPath = 'assets/disappointed-face_1f61e.png';
    } else if (days <= 20) {
      this.imgPath = 'assets/neutral-face_1f610.png';
    } else if (days <= 30) {
      this.imgPath = 'assets/relieved-face_1f60c.png';
    } else if (days <= 35) {
      this.imgPath = 'assets/slightly-smiling-face_1f642.png';
    } else {
      this.imgPath = 'assets/smiling-face-with-sunglasses_1f60e.png';
    }
  }

  copyUrl() {
      const textArea = document.createElement('textarea');
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = this.url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          this.sb.open('URL was copied to your clipboard.', 'ok', {duration: 2000});
        }
      } catch (err) {}
      document.body.removeChild(textArea);
    }

    reset() {
      this.diagRef = this.dialog.open(this.confirmDiag);
      this.diagRef.afterClosed().subscribe(result => {
        if (result === environment.secret) {
          const amount = this.counter;
          firebase.database().ref('highestRecord').once('value').then(res => {
            const previous = res.val();
            if (+previous < amount) {
              firebase.database().ref('highestRecord').set(amount).then( record => {
                this.sb.open(`A new record of ${amount} days was set!`, 'Yay', {duration: 2000});
              });
            }
          });
          firebase.database().ref('lastDied').set(moment().format('MM-DD-YYYY')).then(res => {
            this.sb.open('Reset was successful!', 'Yay!', {duration: 2000});
          });
        } else if (result !== null) {
          this.sb.openFromTemplate(this.customSB, {duration: 2000});
        }
      });


    }
    cancel() {
      this.diagRef.close(null);
    }

    calcDays(date: string): number {
      const crashed = moment(date, 'MM[-]DD[-]YYYY');
      const duration = moment.duration(moment().diff(crashed));
      return  Math.floor(duration.asDays());
    }
}


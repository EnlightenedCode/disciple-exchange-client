import { Injectable, Inject } from '@angular/core';
import 'rxjs/Rx';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {

  private _authState: FirebaseAuthState = null;

  constructor(
    public auth: AngularFireAuth
  ) {
    this.auth.subscribe((state: FirebaseAuthState) => {
      this._authState = state;
    });
  }

  get authenticated(): boolean {
    return this._authState !== null;
  }

  get authState(): FirebaseAuthState {
    return this._authState;
  }

  updateUserProfile() {
    console.log('updating user profile');
    return this._authState.auth.updateProfile({
      displayName: 'Link Notingham',
      photoURL: 'some/url'
    });
  }

}

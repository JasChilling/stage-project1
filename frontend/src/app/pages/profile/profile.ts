import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  private profileService = inject(ProfileService);


  user = {
    name: '',
    email: '',
    bio: '',
    profilePicture: ''
  };


  editing = false;


  ngOnInit(): void {

    this.loadProfile();

  }


  loadProfile(): void {

    this.profileService.getProfile().subscribe({

      next: (data) => {

        this.user = {
          name: data.name,
          email: data.email,
          bio: data.bio || '',
          profilePicture: data.profilePicture || ''
        };

      },

      error: (error) => {

        console.error(
          'Failed to load profile:',
          error
        );

      }

    });

  }


  editProfile(): void {

    this.editing = true;

  }


  saveProfile(): void {

    this.profileService
      .updateProfile(this.user)
      .subscribe({

        next: (response) => {

          console.log(
            'Profile updated:',
            response
          );

          this.editing = false;

          this.loadProfile();

        },

        error: (error) => {

          console.error(
            'Failed to update profile:',
            error
          );

        }

      });

  }


  cancelEdit(): void {

    this.editing = false;

    this.loadProfile();

  }

}
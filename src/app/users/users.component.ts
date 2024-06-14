import { Component, ComponentFactoryResolver, Input, ViewChild, viewChild } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ViewContainer } from '../viewContainer.directive';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ConfirmDeleteComponent, ViewContainer],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private userService: UserService, private conponentFactoryResolver: ComponentFactoryResolver) { 

  }

  users: User[] = [];
  showConfirmDeleteComponent:boolean  = false;

  userToDelete:User;

  @Input() appContainer;

  @ViewChild(ViewContainer, {static:false}) container: ViewContainer

  onConfirmObs;

  ngOnInit() {
    this.users = this.userService.users;
  }

  OnDeleteClicked(user:User) {
    // this.showConfirmDeleteComponent = !this.showConfirmDeleteComponent;
    this.userToDelete = user;
    this.showConfirmDelete(this.userToDelete);
  }

  onUserDeletionConfirmed(value:boolean) {
    this.showConfirmDeleteComponent = false;
    if(value) {
      //delete the user
     let indexOfDeleteUser =  this.userService.users.indexOf(this.userToDelete);
     this.userService.users.splice(indexOfDeleteUser,1);
    }
  }
  //Trying to create an instance of ComponentFactoryComponent
  showConfirmDelete(user:User){
    //Instance of ComponentFactoryComponent no DeleteConfirmComponent itself because angular doesn't know 
    //where to attched the component inside the view
    const confirmDeleteComponentFactory = 
        this.conponentFactoryResolver.resolveComponentFactory(ConfirmDeleteComponent);
    const containerViewRef = this.container.viewContainer;
    containerViewRef.clear();
    //rendering the component in the DOM
    const componentRef = containerViewRef.createComponent(confirmDeleteComponentFactory);
    componentRef.instance.userToDelete = user;
    this.onConfirmObs = componentRef.instance.onConfirmation.subscribe((data:boolean) => {
        this.onConfirmObs.unsubscribe();
        containerViewRef.clear();
        if(data) {
          //delete the user
         let indexOfDeleteUser =  this.userService.users.indexOf(this.userToDelete);
         this.userService.users.splice(indexOfDeleteUser,1);
        }
    })
  }
}

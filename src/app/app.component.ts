import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router, public storageService: StorageService) { }

  ngOnInit(): void {
  }

 
}

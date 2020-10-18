import { Component, Input, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuBars = faBars;
  @Input() authenticated = false;
  isMenuOpen = false;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import {TagsService} from '../services/tags.service';
import {Tag} from './tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[];
  pictures = [
    '/assets/img/rock.jpeg',
    '/assets/img/electro.jpg',
    '/assets/img/indie.png',
    '/assets/img/hip_hop.jpg',
    '/assets/img/r_b.jpeg',
    '/assets/img/pop.jpg',
  ];

  constructor( private tagService: TagsService) { }

  ngOnInit(): void {
    this.tagService.getTags().subscribe((res) => {
      this.tags = res.tags.tag;
      this.tags.forEach((item, index) => {
        item.imageUrl = this.pictures[index];
        return item;
      });
    });
  }

}

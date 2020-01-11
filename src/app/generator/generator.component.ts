import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { Code } from '../core/models/Code';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  cols = [0,1,2,3,4,5,6,7,8,9];
  matrix = [];
  showMatrix = false;
  inputChar = '';
  isDisabled = false;
  showCode = false;
  code: Code = new Code();

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.generateGrid();
    setInterval(() => {
      this.generateGrid();
    }, 2000);
  }

  generateGrid() {
    this.matrix = [];
    this.code = new Code();
    this.cols.map( col => {
      this.matrix.push(this.genCharacterArray(10));
    })
    this.showMatrix = true;
    this.generateCode();
  }

  genCharacterArray(length) {
    console.log(this.inputChar);
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    if (this.inputChar != '') {
      characters = characters.replace(this.inputChar, '');
      result += this.inputChar + this.inputChar;
      for ( let i = 0; i < length-2; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result.split('').sort( (el1,el2) => Math.random() - Math.random());
    } else {
      for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result.split('');
    }
 }

 validateInput(event) {
   if(event.target.value.length > 0) {
    this.isDisabled = true;
    setTimeout(() => {
     this.isDisabled = false;
    }, 4000);
  }
 }

  generateCode() {
    let seconds = (new Date().getSeconds() < 10 ? '0' : '') + new Date().getSeconds();
    let secondsArr = seconds.split('');
    let firstChar = this.matrix[secondsArr[0]][secondsArr[1]];
    let secondChar = this.matrix[secondsArr[1]][secondsArr[0]];
    const ocurrences = this.getOcurrences(firstChar, secondChar);
    if(ocurrences[firstChar] > 9) {
      ocurrences[firstChar] = this.getNewCount(ocurrences[firstChar], 1);
    }
    if(ocurrences[secondChar] > 9) {
      ocurrences[secondChar] = this.getNewCount(ocurrences[secondChar], 1);
    }
    this.code.value = ocurrences[firstChar].toString() + ocurrences[secondChar].toString();
    this.code.grid = this.matrix;
    this.dataService.saveCode(this.code);
    this.showCode = true;
  }

  getOcurrences(firstChar, secondChar) {
    const ocurrences = {};
    this.matrix.forEach( row => {
      row.forEach( curr => {
        if(curr == firstChar || curr == secondChar) {
          if (typeof ocurrences[curr] == 'undefined') {
            ocurrences[curr] = 1;
          } else {
            ocurrences[curr] += 1;
          }
        }
      });
    })
    return ocurrences;
  }

  getNewCount(count, divisor) {
    if( (count / divisor) <= 9) {
      return Math.round(count / divisor);
    }
    else {
      return this.getNewCount(count, ++divisor);
    }
  }

}

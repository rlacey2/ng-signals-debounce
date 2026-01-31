
import { Component, computed, effect, Signal, signal } from '@angular/core';



@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class AppComponent {

  data = [
    { name: 'alpha' },
    { name: 'beta' },
    { name: 'gamma' },
    { name: 'delta' },
    { name: 'epsilon' }
  ]


  dataSource = signal<any>(this.data);

  debouncedQuery!: Signal<string>;

  searchQuery = signal<any>('');

  dataSourceFiltered = computed(() =>
    this.dataSource().filter((x: any) => {
      return (x.name).toLowerCase().includes(this.debouncedQuery().toLowerCase())
    }
    )
  ); 

  debouncedQuery2!: Signal<string>;
  searchQuery2 = signal<any>('');

  dataSourceFiltered2 = computed(() =>
    this.dataSource().filter((x: any) => {
      return (x.name).toLowerCase().includes(this.debouncedQuery2().toLowerCase())
    }
    )
  );
 
  constructor() {
    this.debouncedQuery = debouncedSignal(this.searchQuery, 400);   // also delays the reset
    this.debouncedQuery2 = debouncedSignal(this.searchQuery2, 400); // also delays the reset
    effect(() => {
      let temp = this.debouncedQuery();
      console.log(temp);
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onSearchInput2(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery2.set(input.value);
  }

clearFilterStatus() {
  this.searchQuery.set("");
}

clearFilterStatus2() {
  this.searchQuery2.set("");
}

}
 
function debouncedSignal<T>(source: Signal<T>, delay: number): Signal<T> {
  let timeout: any;
  let debouncedQuery = signal(source());
  effect(() => {
    console.log('debouncedSignal')
    let value = source();
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedQuery.set(value);
    }, delay);
  });
  return debouncedQuery.asReadonly();
}
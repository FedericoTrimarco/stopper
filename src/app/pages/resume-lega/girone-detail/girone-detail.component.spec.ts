import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GironeDetailComponent } from './girone-detail.component';

describe('GironeDetailComponent', () => {
  let component: GironeDetailComponent;
  let fixture: ComponentFixture<GironeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GironeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GironeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

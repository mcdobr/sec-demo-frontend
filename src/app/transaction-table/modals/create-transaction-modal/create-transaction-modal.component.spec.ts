import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionModalComponent } from './create-transaction-modal.component';

describe('CreateExpenseModalComponent', () => {
  let component: CreateTransactionModalComponent;
  let fixture: ComponentFixture<CreateTransactionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransactionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

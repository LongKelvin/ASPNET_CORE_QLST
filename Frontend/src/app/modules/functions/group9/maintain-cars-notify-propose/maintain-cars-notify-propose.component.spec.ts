import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainCarsNotifyProposeComponent } from './maintain-cars-notify-propose.component';

describe('MaintainCarsNotifyAddComponent', () => {
    let component: MaintainCarsNotifyProposeComponent;
    let fixture: ComponentFixture<MaintainCarsNotifyProposeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MaintainCarsNotifyProposeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MaintainCarsNotifyProposeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

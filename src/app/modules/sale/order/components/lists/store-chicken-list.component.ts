import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from "../../../../../../environments/generals";
import {commonStandaloneImports} from "../../../../../shared/utils/common-imports";

@Component({
    selector: 'app-store-chicken-list',
    standalone: true,
    imports: [
        ...commonStandaloneImports,
    ],
    template: `
        <div class="flex flex-wrap">
            @for (d of data; track d.id; let idx = $index) {
                <div class="p-5 md:w-1/3">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl transition ease-in-out duration-300 cursor-pointer relative"
                         (click)="goNewChichen(d)">
                        <img class="mx-auto" src="{{d.img}}" alt="Strawberries" style="width: 20vh">
                        <div class="absolute top-0 right-0 m-3">
                            <span class="text-white text-lg bg-red-600 px-3 py-1 rounded">S/{{d.price??'00.00'}}</span>
                        </div>
                        <div class="py-1">
                            <div class="font-bold text-xl mb-2 text-center">{{d.name}}</div>
                        </div>
                        <div class="px-6 pt-1 pb-2 flex justify-center">
                            @for (tag of d.tags; track tag; let idx = $index) {
                                <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{tag}}</span>
                            }
                        </div>
                    </div>
                </div>
            } @empty {
                <div class="w-full text-center text-gray-500">
                    No hay productos
                </div>
            }
        </div>




    `,
})
export class StoreChickenListComponent implements OnInit {
    abcForms: any;
    @Output() eventNew = new EventEmitter<boolean>();
    @Output() eventEdit = new EventEmitter<string>();
    @Output() eventDelete = new EventEmitter<string>();
    @Output() eventNewChicken = new EventEmitter<any>();

    constructor() {
    }
    data = [
        {
            id: 0,
            name: 'Pollo 1/8',
            price: 9.00,
            img: 'https://images.vexels.com/media/users/3/143088/isolated/preview/f565debc52083dacca60da22284e4083-icono-de-pierna-de-pollo.png',
            tags: ['#fresh', '#juicy']
        },
        {
            id: 1,
            name: 'Pollo 1/4',
            price: 14.00,
            img: 'https://cdn-icons-png.freepik.com/512/1046/1046802.png',
            tags: ['#fresh', '#juicy']
        },
        {
            id: 2,
            name: 'Pollo 1/2',
            price: 20.00,
            img: 'https://cdn-icons-png.freepik.com/512/1046/1046802.png',
            tags: ['#fresh', '#juicy']
        },
        {
            id: 3,
            name: 'Pollo 1',
            price: 40.00,
            img: 'https://cdn-icons-png.freepik.com/512/1046/1046802.png',
            tags: ['#fresh']
        }
    ]

    ngOnInit() {
        this.abcForms = abcForms;
    }

    ngOnChanges() {

    }


    public goNew() {
        this.eventNew.emit(true);
    }


    public goEdit(id: string): void {
        this.eventEdit.emit(id);
    }

    public goDelete(id: string): void {
        this.eventDelete.emit(id);
    }

    public goNewChichen(data: any): void {
        this.eventNewChicken.emit(data);
    }

    protected readonly alert = alert;
}

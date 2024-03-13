import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ANGULAR_COMMON, PRIME_COMMON } from '@app/common';
import { ElementRendererComponent, PageLayoutComponent, TabbedResponseTableComponent, TabbedResponseTableConfig } from '@app/components';
import { TextBlockConfig as ElementBase } from '@app/models';
import { Utils, XMLCollectionDef } from '@app/services';
import { LoremIpsum } from 'lorem-ipsum';

@Component({
    selector: 'gdo-home-page',
    standalone: true,
    imports: [
        ElementRendererComponent,
        PageLayoutComponent,
        TabbedResponseTableComponent,
        ...PRIME_COMMON,
        ...ANGULAR_COMMON,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

    // #region public properties

    public lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });

    public elements: ElementBase[] = [];

    public charClasses: string[] = [
        'illuminated',
        'illuminated-red',
        'illuminated-blue',
        'illuminated-green',
        'illuminated-yellow',
        'illuminated-purple',
        'illuminated-cyan',
    ];

    public borderClasses: string[] = [
        'illuminated-border',
        'illuminated-border-red',
        'illuminated-border-blue',
        'illuminated-border-green',
        'illuminated-border-yellow',
        'illuminated-border-purple',
        'illuminated-border-cyan',
    ];

    public xmlData: string = '';

    public tabConfig: TabbedResponseTableConfig = {
        xmlCollectionTags: ['collection-1', 'collection-2', 'collection-3']
    };

    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        this.borderClasses.forEach((borderClass) => {
            this.charClasses.forEach((charClass, index) => {
                const text = this.lorem.generateParagraphs(1);
                this.elements.push({
                    elementType: 'text-block',
                    content: text,
                    illuminated: index % 2 === 0,
                    illuminatedColor: charClass,
                    illuminatedBorder: borderClass,
                    id: `text-block-${index}`,
                });
            });
        });

        const xmlDef: XMLCollectionDef[] = [
            {
                name: 'collection-1',
                count: 10,
                properties: [
                    {
                        name: 'property-1',
                        type: 'string'
                    },
                    {
                        name: 'property-2',
                        type: 'int'
                    },
                    {
                        name: 'property-3',
                        type: 'date'
                    },
                    {
                        name: 'property-4',
                        type: 'string'
                    }
                ]
            },
            {
                name: 'collection-2',
                count: 10,
                properties: [
                    {
                        name: 'property-1',
                        type: 'string'
                    },
                    {
                        name: 'property-2',
                        type: 'int'
                    },
                    {
                        name: 'property-3',
                        type: 'date'
                    },
                    {
                        name: 'property-4',
                        type: 'string'
                    }
                ]
            },
            {
                name: 'collection-3',
                count: 10,
                properties: [
                    {
                        name: 'property-1',
                        type: 'string'
                    },
                    {
                        name: 'property-2',
                        type: 'int'
                    },
                    {
                        name: 'property-3',
                        type: 'date'
                    },
                    {
                        name: 'property-4',
                        type: 'string'
                    }
                ]
            }
        ];

        this.xmlData = Utils.generateXMLData(xmlDef);
        
    }

    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public getRandomInt(max: number = 7): number {
        const result = Math.floor(Math.random() * max);
        return result;
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

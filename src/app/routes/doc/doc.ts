import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { MetaService } from '../../services/meta';
import { Docs } from '../../services/docs';
import { Doc } from '../../models/doc';

@Component({
  selector: 'app-doc',
  imports: [],
  templateUrl: './doc.html',
  styleUrl: './doc.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DocRoute {
  private route = inject(ActivatedRoute);
  private docsS = inject(Docs);
  private metaS = inject(MetaService);
  postContent = viewChild.required<ElementRef>('postContent');

  doc = signal<Doc | undefined>(undefined);
  private routeParamsSubscription: Subscription | undefined;
  postNotFound = signal(false);

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe(
      async (param) => {
        try {
          this.doc.set(undefined);
          this.postNotFound.set(false);

          const fileName =
            param['fileName'] ||
            (await firstValueFrom(this.route.data))?.['fileName'];

          // load doc
          if (fileName) this.doc.set(await this.docsS.getDoc(fileName));

          // set meta tags
          if (this.doc()?.docMeta) {
            this.metaS.updateMetaTags(this.doc()!.docMeta);
          }
        } catch {
          this.postNotFound.set(true);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
  }
}

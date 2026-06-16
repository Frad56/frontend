# 📚 Frontend Components Library

## Overview
Nouvelle librairie de composants UI réutilisables pour le projet Stock Management, utilisant **Tailwind CSS** pour un style cohérent et moderne.

## 🎨 Design System

### Couleurs (Tailwind Theme)
```
Primary:     #0ea5e9 (sky-500)
Secondary:   #a855f7 (purple-600)
Success:     #10b981 (emerald-600)
Warning:     #f59e0b (amber-500)
Danger:      #ef4444 (red-500)
```

### Typography
- **Headings:** Roboto Slab, semibold
- **Body:** System fonts, regular
- **Size:** 14px base

## 📦 Composants Disponibles

### 1. **ButtonComponent**
Bouton réutilisable avec multiple variantes

```html
<app-button 
  label="Click me"
  variant="primary"
  size="md"
  [isLoading]="false"
  (onClick)="handleClick()">
</app-button>
```

**Props:**
- `label: string` - Texte du bouton
- `variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'`
- `size: 'sm' | 'md' | 'lg'`
- `disabled: boolean`
- `isLoading: boolean`
- `type: 'button' | 'submit' | 'reset'`

---

### 2. **CardComponent**
Composant conteneur pour afficher du contenu en carte

```html
<app-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-card>
```

**Props:**
- `header: boolean` - Afficher une section header
- `footer: boolean` - Afficher une section footer

---

### 3. **InputComponent**
Champ de saisie avec validation

```html
<app-input 
  type="email"
  label="Email"
  placeholder="Enter email"
  [required]="true"
  [value]="email"
  (valueChange)="onEmailChange($event)">
</app-input>
```

**Props:**
- `type: InputType`
- `label: string`
- `placeholder: string`
- `value: string`
- `disabled: boolean`
- `required: boolean`
- `readonly: boolean`
- `error: string`
- `hint: string`

---

### 4. **BadgeComponent**
Badge pour afficher des statuts

```html
<app-badge 
  label="Active"
  variant="success">
</app-badge>
```

**Props:**
- `label: string`
- `variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'`

---

### 5. **AlertComponent**
Messages d'alerte dismissibles

```html
<app-alert 
  type="success"
  message="Operation completed!"
  [dismissible]="true">
</app-alert>
```

**Props:**
- `type: 'success' | 'warning' | 'danger' | 'info'`
- `message: string`
- `title: string`
- `dismissible: boolean`

---

### 6. **SpinnerComponent**
Indicateur de chargement

```html
<app-spinner 
  size="md"
  message="Loading...">
</app-spinner>
```

**Props:**
- `size: 'sm' | 'md' | 'lg'`
- `message: string`

---

### 7. **TableComponent**
Tableau de données réutilisable

```html
<app-table 
  [data]="products"
  [columns]="columns"
  [actions]="true"
  (sort)="onSort($event)">
  <!-- Action buttons in content -->
</app-table>
```

**Props:**
- `data: any[]`
- `columns: TableColumn[]`
- `actions: boolean`
- `sortColumn: string`
- `sortDirection: 'asc' | 'desc'`

**TableColumn Interface:**
```typescript
interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}
```

---

### 8. **ModalComponent**
Modal dialog réutilisable

```html
<app-modal 
  title="Confirm Delete"
  [isOpen]="showModal"
  confirmLabel="Delete"
  cancelLabel="Cancel"
  (onConfirm)="handleDelete()"
  (onClose)="closeModal()">
  <p>Are you sure you want to delete this item?</p>
</app-modal>
```

**Props:**
- `title: string`
- `isOpen: boolean`
- `showFooter: boolean`
- `confirmLabel: string`
- `cancelLabel: string`

---

### 9. **FormBuilderComponent**
Constructeur de formulaires dynamiques

```html
<app-form-builder 
  [fields]="formFields"
  [form]="myForm"
  submitLabel="Save"
  [isSubmitting]="false"
  (onFormSubmit)="handleSubmit($event)"
  (onFormCancel)="handleCancel()">
</app-form-builder>
```

**Props:**
- `fields: FormField[]`
- `form: FormGroup`
- `submitLabel: string`
- `isSubmitting: boolean`

**FormField Interface:**
```typescript
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: any; label: string }[];
}
```

---

## 🎯 Layouts

### MainLayoutComponent
Layout principal avec navbar et footer

```html
<app-main-layout></app-main-layout>
```

### AuthLayoutComponent
Layout pour les pages d'authentification

```html
<app-auth-layout></app-auth-layout>
```

---

## 📝 Import Example

```typescript
import { 
  ButtonComponent, 
  CardComponent, 
  InputComponent,
  BadgeComponent,
  AlertComponent,
  SpinnerComponent,
  TableComponent,
  ModalComponent,
  TableColumn
} from '@shared/components/ui';
import { MainLayoutComponent, AuthLayoutComponent } from '@shared/components/layouts';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    InputComponent,
    // ... other components
  ],
  template: `...`
})
export class MyComponent {}
```

---

## 🎨 Tailwind CSS Integration

Tous les composants utilisent **Tailwind CSS** directement. Les styles sont définis en utilisant les classes Tailwind.

### Classes principales disponibles:
- `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-danger`
- `.card`, `.card-header`, `.card-body`, `.card-footer`
- `.badge`, `.badge-primary`, `.badge-success`, etc.
- `.alert`, `.alert-success`, `.alert-danger`, etc.

---

## 🔄 Global Styles

Fichier: `src/styles.css`

Contient:
- Résets CSS
- Variables Tailwind personnalisées
- Classes utilitaires global
- Styles pour les éléments HTML standards (input, textarea, etc.)

---

## 📋 Checklist - Utilisation des Nouveaux Composants

### Pour chaque nouvelle page:

- [ ] Remplacer Material Components par les nouveaux composants
- [ ] Utiliser les layouts (MainLayoutComponent ou AuthLayoutComponent)
- [ ] Utiliser Tailwind CSS pour les styles personnalisés
- [ ] Vérifier la responsiveness avec les classes Tailwind
- [ ] Tester le thème sombre si applicable
- [ ] Valider l'accessibilité

---

## 🚀 Future Improvements

- [ ] Ajouter composant Pagination
- [ ] Ajouter composant Tabs
- [ ] Ajouter composant Breadcrumb
- [ ] Ajouter composant Dropdown
- [ ] Ajouter animations et transitions
- [ ] Support du dark mode
- [ ] Meilleure gestion des erreurs de formulaires

---

## 📞 Support

Pour des questions sur les composants, consultez les fichiers TypeScript des composants individuels.

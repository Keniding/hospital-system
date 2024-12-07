import os
import subprocess

def run_ng_command(command):
  """Ejecuta un comando de Angular CLI"""
  try:
    print(f"Ejecutando: ng {command}")
    subprocess.run(f"ng {command}", shell=True, check=True)
    print(f"✅ Comando ejecutado exitosamente: ng {command}")
  except subprocess.CalledProcessError as e:
    print(f"❌ Error ejecutando el comando: ng {command}")
    print(f"Error: {str(e)}")

def create_directory(path):
  """Crea un directorio si no existe"""
  if not os.path.exists(path):
    os.makedirs(path)
    print(f"Creado directorio: {path}")

def setup_angular_project():
  # Crear estructura base de directorios
  base_directories = [
    'src/app/core',
    'src/app/shared',
    'src/app/features',
    'src/app/layouts',
    'src/assets',
    'src/environments'
  ]

  for directory in base_directories:
    create_directory(directory)

  # Generar módulos principales
  modules = [
    "core",
    "shared",
    "features/auth",
    "features/dashboard",
    "features/patients",
    "features/appointments",
    "features/inventory",
    "features/staff",
    "features/billing",
    "features/reports"
  ]

  print("\n1. Generando módulos principales...")
  for module in modules:
    if "features/" in module:
      run_ng_command(f"generate module {module} --routing")
    else:
      run_ng_command(f"generate module {module}")

  # Generar componentes de layout
  print("\n2. Generando componentes de layout...")
  layout_components = [
    "layouts/main-layout",
    "layouts/auth-layout",
  ]

  for component in layout_components:
    run_ng_command(f"generate component {component}")

  # Generar componentes compartidos
  print("\n3. Generando componentes compartidos...")
  shared_components = [
    "shared/components/header",
    "shared/components/sidebar",
    "shared/components/footer"
  ]

  for component in shared_components:
    run_ng_command(f"generate component {component}")

  # Generar servicios core
  print("\n4. Generando servicios core...")
  core_services = [
    "auth",
    "http-interceptor",
    "error-handler",
    "loading",
  ]

  for service in core_services:
    run_ng_command(f"generate service core/services/{service}")

  # Generar guards
  print("\n5. Generando guards...")
  guards = [
    "auth",
    "role",
  ]

  for guard in guards:
    run_ng_command(f"generate guard core/guards/{guard}")

  # Generar componentes para cada módulo de features
  print("\n6. Generando componentes para los módulos de features...")
  feature_components = {
    "auth": ["login", "register", "forgot-password"],
    "dashboard": ["dashboard-home", "statistics"],
    "patients": ["patient-list", "patient-detail", "patient-form"],
    "appointments": ["appointment-list", "appointment-calendar", "appointment-form"],
    "inventory": ["inventory-list", "inventory-detail", "inventory-form"],
    "staff": ["staff-list", "staff-detail", "staff-form"],
    "billing": ["invoice-list", "invoice-detail", "payment-form"],
    "reports": ["general-report", "financial-report", "patient-report"]
  }

  for feature, components in feature_components.items():
    for component in components:
      run_ng_command(f"generate component features/{feature}/{component}")

  # Generar interfaces/modelos
  print("\n7. Generando interfaces/modelos...")
  models = [
    "user",
    "patient",
    "appointment",
    "inventory-item",
    "staff-member",
    "invoice"
  ]

  for model in models:
    create_directory(f"src/app/core/models")
    with open(f"src/app/core/models/{model}.interface.ts", "w") as f:
      f.write(f"export interface {model.title().replace('-', '')} {{\n  // TODO: Add interface properties\n}}")

  print("\n✅ Proyecto Angular generado exitosamente!")
  print("\nRecuerda:")
  print("1. Revisar y ajustar los módulos generados según tus necesidades")
  print("2. Configurar las rutas en los archivos de routing")
  print("3. Implementar los guards y servicios generados")
  print("4. Completar las interfaces de modelos")

if __name__ == "__main__":
  setup_angular_project()

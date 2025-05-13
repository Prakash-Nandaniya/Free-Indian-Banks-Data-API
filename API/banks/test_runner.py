from django.test.runner import DiscoverRunner
from django.db import connection
from django.apps import apps

class NoTransactionTestRunner(DiscoverRunner):
    """A test runner that does not enforce transactions, for use with SQLite and manual schema editing."""
    def setup_databases(self, **kwargs):
        # Setup as usual
        old_config = super().setup_databases(**kwargs)
        # Disable foreign key checks
        with connection.cursor() as cursor:
            cursor.execute('PRAGMA foreign_keys = OFF;')
        # Manually create tables for unmanaged models
        with connection.schema_editor() as schema_editor:
            Bank = apps.get_model('banks', 'Bank')
            Branch = apps.get_model('banks', 'Branch')
            schema_editor.create_model(Bank)
            schema_editor.create_model(Branch)
        # Re-enable foreign key checks
        with connection.cursor() as cursor:
            cursor.execute('PRAGMA foreign_keys = ON;')
        return old_config

    def teardown_databases(self, old_config, **kwargs):
        # Clean up created tables
        with connection.schema_editor() as schema_editor:
            Branch = apps.get_model('banks', 'Branch')
            Bank = apps.get_model('banks', 'Bank')
            schema_editor.delete_model(Branch)
            schema_editor.delete_model(Bank)
        return super().teardown_databases(old_config, **kwargs)

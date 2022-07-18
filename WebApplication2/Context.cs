using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using WebApplication2.Models;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Migrations;
using System.Data.Entity.Infrastructure;

namespace DataAccess
{
    public class Context : DbContext
    {
        public Context()
            : base("DefaultConnection")
        {
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.AutoDetectChangesEnabled = false;
        }

        public void CreateDatabaseIfNotExists()
        {
            if (this.Database.CreateIfNotExists())
            {
                var configuration = new WebApplication2.Migrations.Configuration();
                configuration.TargetDatabase = new DbConnectionInfo(this.Database.Connection.ConnectionString, "System.Data.SqlClient");

                var migrator = new DbMigrator(configuration);
                migrator.Update();

                var Config = new WebApplication2.Migrations.Configuration();
                Config.ForceSeed(this);
            }
        }

        public DbSet<Sample> Samples { get; set; }
        public DbSet<SampleInfo> SampleInfos { get; set; }
        public DbSet<SampleClass> SampleClasses { get; set; }
        public DbSet<ServiceCenter> ServiceCenters { get; set; }
        public DbSet<SampleType> SampleTypes { get; set; }
        public DbSet<SampleReason> SampleReasons { get; set; }
        public DbSet<SampleConclusion> SampleConclusions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public virtual void MarkAsAdded(object entity)
        {
            this.Entry(entity).State = EntityState.Added;
        }

        public virtual void MarkAsModified(object entity)
        {
            this.Entry(entity).State = EntityState.Modified;
        }

        public virtual void MarkAsDeleted(object entity)
        {
            this.Entry(entity).State = EntityState.Deleted;
        }
    }
}
